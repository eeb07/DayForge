'use client'
import  ImageUpload, {InputProvider}  from "@/components/PromptForm";
import Image from "next/image";

export default function Home() {
  return (
    <div >
     <InputProvider/>
     <ImageUpload/>
    </div>
  );
}
