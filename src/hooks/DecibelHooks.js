import { useState, useEffect, useRef, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDecibel, setIsRecording } from '@store/slices/decibelSlice';

const useDecibel = () => {
  const dispatch = useDispatch();
  const decibel = useSelector((state) => state.decibel.value);
  const isRecording = useSelector((state) => state.decibel.isRecording);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [audioUrl, setAudioUrl] = useState(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameId = useRef(null);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const isCapturingRef = useRef(false);
  const isRecordingRef = useRef(false);

  const BUFFER_DURATION = 10; // 전후 10초 녹음
  const DECIBEL_THRESHOLD = 95; // 기준값 90dB

  // 오디오 컨텍스트 초기화
  const initAudioContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048; // 분석 크기 조정
      dataArrayRef.current = new Uint8Array(
        analyserRef.current.frequencyBinCount
      );
    }
  };

  const calculateDecibel = () => {
    if (!analyserRef.current || !isRecordingRef.current) return;

    const dataArray = dataArrayRef.current;
    analyserRef.current.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i] * dataArray[i];
    }
    const rms = Math.sqrt(sum / dataArray.length);

    // 실제 RMS 값을 기준으로 데시벨 계산
    let decibelValue = 20 * Math.log10(rms) + 100;

    // 화면에 표시되는 데시벨 값 보정
    const calibration = 45;
    const adjustedDecibel = decibelValue - calibration;

    const minDecibels = 0;
    const maxDecibels = 130;

    dispatch(
      updateDecibel(
        Math.min(maxDecibels, Math.max(minDecibels, adjustedDecibel))
      )
    );

    // 기준 데시벨을 넘으면 녹음 실행 (녹음 로직은 그대로 유지)
    if (adjustedDecibel > DECIBEL_THRESHOLD && !isCapturingRef.current) {
      isCapturingRef.current = true;
      console.log('최종 데시벨 값:', adjustedDecibel);
      console.log('90dB 초과! 녹음 시작');

      setIsModalOpen(true);
      setIsLoading(true);

      captureAudio(adjustedDecibel).then(() => {
        stopRecording();
        console.log('녹음 종료 및 서버 전송 완료');
      });
    }
  };

  // 데시벨 측정 시작
  const startDecibelMonitoring = () => {
    const update = () => {
      calculateDecibel();
      animationFrameId.current = requestAnimationFrame(update);
    };
    animationFrameId.current = requestAnimationFrame(update);
  };

  // 녹음 시작 (한 번만 실행되도록 보완)
  const startRecording = async () => {
    if (isRecordingRef.current) return;
    isRecordingRef.current = true; // 녹음 시작 상태 설정

    try {
      await initAudioContext();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);

          const maxChunks = Math.ceil(BUFFER_DURATION);
          if (audioChunksRef.current.length > maxChunks) {
            audioChunksRef.current.shift();
          }
        }
        console.log(audioChunksRef.current);
      };

      mediaRecorderRef.current.start(1000);
      dispatch(setIsRecording(true));
      startDecibelMonitoring();
    } catch (error) {
      console.error('녹음 시작 실패:', error);
      isRecordingRef.current = false; // 실패 시 상태 초기화
    }
  };

  // 녹음 중지 (상태값 초기화 추가)
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    isRecordingRef.current = false;
    isCapturingRef.current = false;
    audioChunksRef.current = [];
    dispatch(setIsRecording(false));
    dispatch(updateDecibel(0));
  };

  // 녹음 후 서버 전송
  const captureAudio = async (adjustedDecibel) => {
    console.log('🎤 녹음 시작: 버퍼 유지 중...');
    await new Promise((resolve) => setTimeout(resolve, BUFFER_DURATION * 1000));

    if (audioChunksRef.current.length === 0) {
      console.warn('⚠ 녹음된 데이터가 없습니다.');
      isCapturingRef.current = false;
      return;
    }

    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    console.log('녹음된 파일 크기:', audioBlob.size);
    const url = URL.createObjectURL(audioBlob);
    console.log('녹음된 파일 URL:', url);
    setAudioUrl(url);
    // Blob을 다운로드하여 확인하는 코드
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded_audio.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    await sendToServer(audioBlob, adjustedDecibel);
    stopRecording(); // 전송 후 녹음 완전히 중지
  };

  // 서버로 오디오 데이터 전송
  const sendToServer = async (audioBlob, adjustedDecibel) => {
    console.log('서버로 오디오 파일 전송 중...');
    const formData = new FormData();
    formData.append('decibel', adjustedDecibel.toFixed(1));
    formData.append('workerZone', 1);
    formData.append('file', audioBlob, 'audio.webm');

    try {
      const response = await fetch('https://api.anjeons.com/audio/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('서버 전송 실패');
      console.log('오디오 전송 성공');
      window.location.reload();
    } catch (error) {
      console.error('오디오 전송 오류:', error);
      window.location.reload();
      alert('분석한 음성이 위험으로 감지되지 않았습니다.');
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsLoading(false);
  };

  useEffect(() => {
    // setTimeout(() => {
    //   startRecording();
    // }, 1000);
    // startRecording();

    return () => {
      stopRecording();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    decibel,
    isRecording,
    startRecording,
    stopRecording,
    isModalOpen,
    setIsModalOpen,
    handleConfirm,
    handleCancel,
    isLoading,
  };
};

export default useDecibel;
