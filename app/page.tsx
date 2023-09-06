"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";

export default function Home() {
  let [value, setValue] = useState(1000);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="flex items-center gap-8">
        <Button onClick={() => setValue(value - 100)}>-100</Button>
        <div className="text-3xl tabular-nums">
          <AnimatedNumber value={value} />
        </div>
        <Button onClick={() => setValue(value + 100)}>+100</Button>
      </div>
    </div>
  );
}

function Button(props: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className="px-3 py-1 hover:text-gray-200 font-medium text-gray-400 rounded active:text-white"
      {...props}
    />
  );
}

function AnimatedNumber({ value }: { value: number }) {
  let v = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  let display = useTransform(v, (current) =>
    Math.round(current).toLocaleString(),
  );

  useEffect(() => {
    v.set(value);
  }, [v, value]);

  return <motion.span>{display}</motion.span>;
}
