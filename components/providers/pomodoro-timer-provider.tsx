"use client";

import { createContext, useContext, useEffect, useState } from "react";

export enum PomodoroState {
  START,
  PAUSE,
  RUNNING,
}

enum PomodoroMode {
  WORK = "work",
  SHORT_BREAK = "short-break",
  LONG_BREAK = "long-break",
}

enum Time {
  WORK = 1 * 60,
  SHORT_BREAK = 1 * 60,
  LONG_BREAK = 15 * 60,
  END = 0,
}

const POMODOROS_BEFORE_LONG_BREAK = 4;

type PomodoroContextType = {
  minutes: number;
  seconds: number;
  state: PomodoroState;
  timeLeft: number;
  mode: PomodoroMode;
  pomodoroCount: number;
  start: () => void;
  pause: () => void;
  toContinue: () => void;
  reset: () => void;
};

const PomodoroContext = createContext<PomodoroContextType | null>(null);

export const PomodoroTimerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState(PomodoroState.START);
  const [timeLeft, setTimeLeft] = useState(Time.WORK);
  const [mode, setMode] = useState(PomodoroMode.WORK);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state !== PomodoroState.RUNNING) return;

    setTimeOutId(
      setTimeout(() => {
        if (timeLeft === Time.END) {
          if (mode === PomodoroMode.WORK) {
            if (pomodoroCount === POMODOROS_BEFORE_LONG_BREAK) {
              setMode(PomodoroMode.LONG_BREAK);
              setTimeLeft(Time.LONG_BREAK);
              setPomodoroCount(0);
              new Notification("It's time for a long break!");
            } else {
              setMode(PomodoroMode.SHORT_BREAK);
              setTimeLeft(Time.SHORT_BREAK);
              setPomodoroCount((prev) => prev + 1);
              new Notification("It's time for a short break!");
            }
          } else {
            setMode(PomodoroMode.WORK);
            setTimeLeft(Time.WORK);
            new Notification("It's time to work!");
          }
          return;
        }

        setTimeLeft((prev) => prev - 1);
      }, 1000)
    );
  }, [timeLeft, state]);

  const start = () => {
    // Request notification permission on mount
    // This is necessary to show notifications when the timer ends
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    setTimeLeft(Time.WORK);
    setState(PomodoroState.RUNNING);
  };

  const pause = () => {
    setState(PomodoroState.PAUSE);
    clearTimeout(timeOutId!);
  };

  const reset = () => {
    setState(PomodoroState.START);
    setTimeLeft(Time.WORK);
    setPomodoroCount(0);
    setMode(PomodoroMode.WORK);
    clearTimeout(timeOutId!);
  };

  const toContinue = () => {
    setState(PomodoroState.RUNNING);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <PomodoroContext.Provider
      value={{
        minutes,
        seconds,
        state,
        timeLeft,
        mode,
        pomodoroCount,
        start,
        pause,
        toContinue,
        reset,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoroTimer = () => {
  const context = useContext(PomodoroContext);
  if (!context)
    throw new Error("usePomodoro must be used within PomodoroProvider");
  return context;
};
