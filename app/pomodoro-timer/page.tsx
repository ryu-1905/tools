"use client";

import {
  PomodoroState,
  usePomodoroTimer,
} from "@/components/providers/pomodoro-timer-provider";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const PomodoroTimer = () => {
  const { minutes, seconds, mode, state, start, pause, reset, toContinue } =
    usePomodoroTimer();

  const showTimeLeft = () => {
    return (
      <div className="text-9xl p-6">{`${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`}</div>
    );
  };

  const createStartPauseButton = () => {
    switch (state) {
      case PomodoroState.START:
        return (
          <Button
            variant="outline"
            onClick={start}
            className="text-4xl p-7"
          >
            START
          </Button>
        );

      case PomodoroState.RUNNING:
        return (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={pause}
              className="text-4xl p-7"
            >
              PAUSE
            </Button>
            <Button
              variant="outline"
              onClick={reset}
              className="text-4xl p-7"
            >
              <RotateCcw />
            </Button>
          </div>
        );

      case PomodoroState.PAUSE:
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={toContinue}
              className="text-4xl p-7"
            >
              CONTINUE
            </Button>
            <Button
              variant="outline"
              onClick={reset}
              className="text-4xl p-7"
            >
              <RotateCcw />
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <div className="text-4xl bg-neutral-500 w-5/12 text-center rounded-lg p-2">
        {mode}
      </div>
      {showTimeLeft()}
      {createStartPauseButton()}
    </div>
  );
};

export default PomodoroTimer;
