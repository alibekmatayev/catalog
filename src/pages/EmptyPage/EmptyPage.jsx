"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import styles from "./EmptyPage.module.scss";

const { backButton } = styles;

export default function EmptyPage() {
  const router = useRouter();

  return (
    <div>
      <button className={backButton} onClick={() => router.back()}>
        <ArrowLeft size={24} />
      </button>

      <div className="center-container">
        <h2>Oops, nothing's here...</h2>
      </div>
    </div>
  );
}
