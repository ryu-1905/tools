"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useRef, useState } from "react";

const Home = () => {
  const [content, setContent] = useState("");
  const qrCodeRef = useRef<HTMLAnchorElement>(null);

  const download = () => {
    if (!qrCodeRef.current) {
      alert("QR code not generated yet");
      return;
    }

    qrCodeRef.current.href = qrCodeRef.current
      .getElementsByTagName("canvas")[0]
      .toDataURL("image/png");
    qrCodeRef.current.download = "qrcode.png";
    qrCodeRef.current.click();

    alert("QR code downloading...");
  };

  return (
    <div className="flex flex-col items-center p-5">
      <Label className="m-5">
        <Input
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </Label>
      {content ? (
        <>
          <a ref={qrCodeRef}>
            <QRCodeCanvas value={content} level="H" size={256} marginSize={2} />
          </a>
          <Button variant="outline" onClick={download} className="m-5">
            <Download />
            Download
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default Home;
