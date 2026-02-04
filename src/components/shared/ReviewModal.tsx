"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner"; // Or your preferred toast library
interface ReviewModalProps {
  mealId: string;
  mealName: string;
  orderId: string;
  // 🟢 ADD THIS LINE:
  onReviewSuccess: () => void;
}
export default function ReviewModal({
  mealId,
  mealName,
  orderId,
  onReviewSuccess,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify({
          mealId,
          rating,
          comment,
          orderId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Review added!");
        setOpen(false); // Close modal
        setComment("");
        onReviewSuccess(); // Reset form
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="text-xs font-bold cursor-pointer rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-200 active:scale-95 hover:-translate-y-0.5"
        >
          <span className="mr-1">⭐</span> Write Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review {mealName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Star Rating Selector */}
          <div className="flex gap-1 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 cursor-pointer transition-colors ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <Textarea
            placeholder="How was the food? Tell us more..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            // 🟢 Fix: force wrap, set width, and prevent manual resize
            className="w-full min-h-25 resize-none whitespace-pre-wrap break-all"
          />

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
