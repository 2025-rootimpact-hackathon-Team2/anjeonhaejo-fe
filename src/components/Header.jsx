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
  const isRecordingRef = useRef(false);

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

  const calculateDecibel = () => {
    if (!analyserRef.current || !isRecordingRef.current) return;

    const dataArray = dataArrayRef.current;
    analyserRef.current.getByteTimeDomainData(dataArray); // 시간 도메인 데이터 사용

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      let normalized = dataArray[i] / 128 - 1; // -1 ~ 1로 정규화
      sum += normalized * normalized;
    }
    const rms = Math.sqrt(sum / dataArray.length); // RMS 계산

    // RMS 값에서 데시벨 계산
    let decibelValue = 20 * Math.log10(rms) + 105; // 보정값을 +105로 변경

    // 최소/최대 데시벨 보정
    const minDecibels = 40; // 최소값 40dB
    const maxDecibels = 130; // 최대값 130dB
    decibelValue = Math.max(minDecibels, Math.min(maxDecibels, decibelValue));

    setDecibel(decibelValue);

    // 기준 데시벨을 넘으면 녹음 시작
    if (decibelValue > DECIBEL_THRESHOLD && !isCapturingRef.current) {
      isCapturingRef.current = true;
      postDecibelRef.current = decibelValue;
      console.log('📊 최종 데시벨 값:', postDecibelRef.current);
      console.log('🔴 90dB 초과! 녹음 시작');

      captureAudio().then(() => {
        stopRecording();
        console.log('✅ 녹음 종료 및 서버 전송 완료');
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
    if (isRecordingRef.current) return; // 🔴 녹음 중이면 실행 안 함
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
      };

      mediaRecorderRef.current.start(1000);
      setIsRecording(true);
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

    isRecordingRef.current = false; // 🔴 녹음 중단 상태 반영
    isCapturingRef.current = false;
    setIsRecording(false);
    setDecibel(0);
  };

  // 녹음 후 서버 전송
  const captureAudio = async () => {
    console.log('🎤 녹음 시작: 버퍼 유지 중...');
    await new Promise((resolve) => setTimeout(resolve, BUFFER_DURATION * 1000));

    if (audioChunksRef.current.length === 0) {
      console.warn('⚠ 녹음된 데이터가 없습니다.');
      isCapturingRef.current = false;
      return;
    }

    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const url = URL.createObjectURL(audioBlob);
    console.log('🎵 녹음된 파일 URL:', url);
    setAudioUrl(url);

    await sendToServer(audioBlob);
    stopRecording(); // 🔴 전송 후 녹음 완전히 중지
  };

  // 서버로 오디오 데이터 전송
  const sendToServer = async (audioBlob) => {
    console.log('🚀 서버로 오디오 파일 전송 중...');
    const formData = new FormData();
    formData.append('decibel', postDecibelRef.current.toFixed(1));
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
