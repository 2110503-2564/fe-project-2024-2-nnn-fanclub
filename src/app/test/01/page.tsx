"use client";

import { useEffect, useState } from "react";
import Cardpanel from "@/components/Cardpanel";
import ProfileCard from "@/components/ProfileCard";
import axios from "axios";
import Homepage from "@/components/Homepage";
import Link from "next/link";
import Topmenu from "@/components/Topmenu";

export default function Home() {

  return (
    <div>
      <Topmenu/>
    </div>
  );
}
