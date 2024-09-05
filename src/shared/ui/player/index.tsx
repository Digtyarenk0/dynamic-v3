import Big from 'big.js';
import cs from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import PauseSvg from 'shared/assets/icons/pause.svg';
import PlaySvg from 'shared/assets/icons/play.svg';
import VolumeControlSvg from 'shared/assets/icons/volume-control.svg';
import { secondToTime } from 'shared/lib/validators/validators';

import { PlayerPropI } from './index.types';
import styles from './player.module.scss';

const defaultPlaying = false;
const defaultPlayed = '0:00';
const defaultLength = '0:00';
const defaultVolume = '0.25';

export const Player = ({ className, file, compactView = false }: PlayerPropI) => {
  const refPlayer = useRef<HTMLAudioElement>(new Audio(file));
  const refSeek = useRef<HTMLInputElement>(null);
  const refPlayed = useRef<HTMLParagraphElement>(null);
  const refVolume = useRef<HTMLInputElement>(null);

  const [playing, setPlaying] = useState(defaultPlaying);
  const [length, setLength] = useState(defaultLength);

  const onReady = useCallback(() => {
    if (refPlayer.current?.duration) {
      const loadSeconds = refPlayer.current.duration;
      const time = secondToTime(loadSeconds);
      setLength(time);
    }
  }, [refPlayer.current?.duration]);

  // Player
  const handleOnProgress = useCallback(() => {
    const playedSeconds = refPlayer.current?.currentTime;
    const loadedSeconds = refPlayer.current?.duration;
    if (playedSeconds && loadedSeconds) {
      const v = Big(playedSeconds).div(loadedSeconds);
      const p = v.mul(100).toString();
      // seek progress
      if (refSeek.current?.style) {
        refSeek.current.value = v.toString();
        refSeek.current.style.background =
          `linear-gradient(to right, #ff4650 0%, #ff4650 ${p}%,` +
          ` rgba(255, 255, 255, 0.25) ${p}%, rgba(255, 255, 255, 0.25) 100%)`;
      }
      // played seconds
      if (refPlayed.current) {
        const played = secondToTime(playedSeconds);
        refPlayed.current.innerHTML = `-${played}`;
      }
    }
  }, [refPlayer.current?.currentTime, refSeek.current?.value]);

  // Button play/pause
  const handlePlayPause = useCallback(() => {
    setPlaying(!playing);
  }, [playing]);

  // Seek
  const handleSeekChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (refPlayer.current?.currentTime) {
        const { max, value } = e.target;
        const v = Big(value).div(max);
        const p = v.mul(100).toString();

        e.target.value = v.toString();
        e.target.style.background =
          `linear-gradient(to right, #ff4650 0%, #ff4650 ${p}%,` +
          ` rgba(255, 255, 255, 0.25) ${p}%, rgba(255, 255, 255, 0.25) 100%)`;

        const loadedSeconds = refPlayer.current.duration;
        const currentTime = v.mul(loadedSeconds).toString();
        refPlayer.current.currentTime = parseFloat(currentTime);
      }
    },
    [refPlayer.current?.currentTime],
  );

  // Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (refPlayer.current?.volume) {
      const { max, value } = e.target;
      const p = Big(value).div(max).mul(100).toString();
      e.target.style.background =
        `linear-gradient(to right, #ff4650 0%, #ff4650 ${p}%,` +
        `rgba(255, 255, 255, 0.25) ${p}%, rgba(255, 255, 255, 0.25) 100%)`;
      refPlayer.current.volume = Number(value);
    }
  };

  const handleVolumeMute = useCallback(() => {
    if (refVolume.current?.value && refPlayer.current?.volume) {
      if (refVolume.current.value === '0') {
        const p = Big(defaultVolume).mul(100).toString();
        refVolume.current.style.background =
          `linear-gradient(to right, #ff4650 0%, #ff4650 ${p}%,` +
          `rgba(255, 255, 255, 0.25) ${p}%, rgba(255, 255, 255, 0.25) 100%)`;
        refVolume.current.value = defaultVolume;
        refPlayer.current.volume = Number(defaultVolume);
        return;
      }
      refVolume.current.style.background =
        'linear-gradient(to right, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.25) 100%)';
      refVolume.current.value = '0';
      refPlayer.current.volume = 0;
    }
  }, [refVolume.current?.value]);

  useEffect(() => {
    playing ? refPlayer.current?.play() : refPlayer.current?.pause();
  }, [playing]);

  useEffect(() => {
    refPlayer.current?.addEventListener('loadeddata', () => {
      onReady();
    });
    refPlayer.current?.addEventListener('timeupdate', () => {
      if (
        refPlayer.current?.currentTime &&
        refPlayed.current?.innerHTML !== secondToTime(refPlayer.current.currentTime)
      )
        handleOnProgress();
    });
    refPlayer.current?.addEventListener('ended', () => {
      setPlaying(false);
    });
    if (refVolume.current) {
      const p = Big(refVolume.current.value).mul(100).toString();
      refVolume.current.style.background =
        `linear-gradient(to right, #ff4650 0%, #ff4650 ${p}%,` +
        ` rgba(255, 255, 255, 0.25) ${p}%, rgba(255, 255, 255, 0.25) 100%)`;
    }

    return () => {
      refPlayer.current?.pause();
      refPlayer.current?.remove();
    };
  }, []);

  return (
    <div className={cs(styles.player, compactView && styles.playerActive, className)}>
      <button className={styles.controller} onClick={handlePlayPause}>
        {!playing ? <PlaySvg /> : <PauseSvg />}
      </button>
      {!compactView && (
        <div className={styles.seek}>
          <input
            ref={refSeek}
            className={styles.input}
            type="range"
            min="0"
            max="0.999999"
            step="any"
            onChange={handleSeekChange}
          />
          <p className={styles.length}>{length}</p>
          <p ref={refPlayed} className={styles.played}>
            {defaultPlayed}
          </p>
        </div>
      )}
      {!compactView && (
        <div className={styles.volume_container}>
          <button className={styles.volume} onClick={handleVolumeMute}>
            <VolumeControlSvg />
          </button>
          <input
            ref={refVolume}
            className={styles.volume_input}
            type="range"
            min="0"
            defaultValue={defaultVolume}
            max="1"
            step="any"
            onInput={handleVolumeChange}
          />
        </div>
      )}
    </div>
  );
};
