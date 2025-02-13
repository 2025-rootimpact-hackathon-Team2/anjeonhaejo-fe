import styles from './Header.module.css';
import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [decibel, setDecibel] = useState(0);
  const postDecibelRef = useRef(0);
  const [audioUrl, setAudioUrl] = useState(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameId = useRef(null);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const isCapturingRef = useRef(false);

  const BUFFER_DURATION = 10; // 전후 10초 녹음
  const DECIBEL_THRESHOLD = 90; // 기준값 90dB

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

  // 실시간 데시벨 계산
  const calculateDecibel = () => {
    if (!analyserRef.current) return;

    const dataArray = dataArrayRef.current;
    analyserRef.current.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i] * dataArray[i];
    }

    const rms = Math.sqrt(sum / dataArray.length);

    let decibelValue = 20 * Math.log10(rms) + 100;

    const calibration = 60;
    const minDecibels = 0;
    const maxDecibels = 130;
    const adjustedDecibelValue =
      (rms / 255) * (maxDecibels - minDecibels) + minDecibels + calibration;

    setDecibel(
      Math.min(maxDecibels, Math.max(minDecibels, adjustedDecibelValue))
    );

    if (decibelValue > DECIBEL_THRESHOLD && !isCapturingRef.current) {
      console.log(decibelValue, '데시벨값:::');
      console.log('90dB 초과! 녹음 시작');
      postDecibelRef.current = decibelValue;
      isCapturingRef.current = true;
      captureAudio();
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

  // 녹음 시작
  const startRecording = async () => {
    try {
      await initAudioContext();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log('이벤트 데이터', event.data);
          audioChunksRef.current.push(event.data);
          console.log(
            'audioChunk값!!!',
            audioChunksRef.current,
            audioChunksRef.current.length
          );

          // 10초 버퍼 유지
          const maxChunks = Math.ceil(BUFFER_DURATION);
          if (audioChunksRef.current.length > maxChunks) {
            audioChunksRef.current.shift(); // 가장 오래된 데이터 삭제
          }
        }
      };

      mediaRecorderRef.current.start(1000); // 1초마다 데이터 저장
      setIsRecording(true);
      startDecibelMonitoring();
    } catch (error) {
      console.error('녹음 시작 실패:', error);
    }
  };

  // 녹음 중지
  const stopRecording = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    setIsRecording(false);
    setDecibel(0);
  };

  // 전후 10초 녹음 파일 저장 및 전송
  const captureAudio = async () => {
    await new Promise((resolve) => setTimeout(resolve, BUFFER_DURATION * 1000));

    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

    console.log('Blob 크기:', audioBlob.size);
    if (audioBlob.size === 0) {
      console.error('생성된 Blob 크기가 0! 오디오 데이터가 손상되었습니다.');
      return;
    }

    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url);
    const audio = new Audio(url);
    audio.controls = true;
    document.body.appendChild(audio);
    audio.play().catch((e) => console.error('❌ 오디오 재생 오류:', e));

    // 다운로드
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test.webm';
    a.click();

    sendToServer(audioBlob);
    isCapturingRef.current = false;
  };

  // 서버로 오디오 데이터 전송
  const sendToServer = async (audioBlob) => {
    console.log(audioBlob, '오디오값!!!');
    console.log('MIME 타입:', mediaRecorderRef.current.mimeType);

    const formData = new FormData();
    formData.append('decibel', postDecibelRef.current);
    formData.append('workerZone', 1);
    formData.append('file', audioBlob, 'audio.webm');

    try {
      const response = await fetch('http://15.165.87.88:8080/audio/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('서버 전송 실패');
      console.log('✅ 오디오 전송 성공');
    } catch (error) {
      console.error('❌ 오디오 전송 오류:', error);
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    //   startRecording();
    // }, 1000);

    return () => {
      stopRecording();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* TODO: 로고 이미지 추가 */}
      <div className={styles.logo}>LOGO</div>
      {/* TODO: 날짜 시간 추가 */}
      <div className={styles.dateTime}>
        <div>현재 음량: {decibel.toFixed(1)} dB</div>
        <button onClick={startRecording}>녹음</button>
        <div className={styles.date}>2025.02.08 AM 12:00</div>
        <div className={styles.day}>목요일</div>
      </div>
    </div>
  );
};

export default Header;
