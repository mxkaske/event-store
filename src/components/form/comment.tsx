"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { EVENT_USER } from "@/constants/event";
import { Textarea } from "../ui/textarea";

// REMINDER: no default value
export default function CommentForm() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const disabled = value === "";

  const onClick = async () => {
    await fetch("api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "add-comment",
        user: EVENT_USER,
        "add-comment": { data: value },
      }),
    });
    router.refresh(); // seems to no reset the value..
    setValue("");
  };
  return (
    <div className="relative">
      <div className="rounded-lg pb-12 shadow-sm border border-border ring-gray-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring">
        <Label htmlFor="comment" className="sr-only">
          Add your comment
        </Label>
        <textarea
          id="comment"
          name="comment"
          className="block w-full resize-none border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
          placeholder="Add your comment..."
          onChange={(e) => setValue(e.target.value)}
          defaultValue={value}
        />
      </div>
      <div className="absolute left-0 bottom-0 flex justify-between py-2 px-3">
        <Button onClick={onClick} size="sm" disabled={disabled}>
          Submit
        </Button>
      </div>
    </div>
  );
}
