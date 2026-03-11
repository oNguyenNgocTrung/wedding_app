"use client";

import { useState } from "react";

const ATTEND_OPTIONS = [
  { value: "0", label: "Cỗ cưới nhà gái - Thứ 7 07/04/2018" },
  { value: "1", label: "Cỗ cưới nhà trai - Chủ nhật 08/04/2018" },
  { value: "2", label: "Lễ cưới - Thứ 2 09/04/2018" },
  { value: "3", label: "Lễ báo hỷ - Thứ 7 14/04/2018" },
];

export default function RsvpForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    note: "",
    attend: [] as string[],
  });
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAttendChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      attend: prev.attend.includes(value)
        ? prev.attend.filter((v) => v !== value)
        : [...prev.attend, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setToast({
          type: "success",
          message: "Cám ơn!!! Hẹn gặp lại vào ngày cưới mình nhé :P",
        });
        setFormData({ name: "", contact: "", note: "", attend: [] });
      } else {
        throw new Error("Failed");
      }
    } catch {
      setToast({
        type: "error",
        message:
          "Hình như có lỗi củ chuối gì đó, bạn thử lại nhé (bow)",
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  return (
    <section
      className="relative section-padding parallax-bg"
      style={{ backgroundImage: "url('/images/QPT_123.jpg')" }}
    >
      <div className="absolute inset-0 bg-[var(--color-dark)] opacity-40" />

      <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] mb-3">
          Bạn sẽ đến đám cưới?
        </h2>
        <h4 className="text-lg font-[Dosis] text-white/80 mb-12">
          Điền thông tin để chúng tôi có thể chuẩn bị tốt nhất nhé!!!
        </h4>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-left">
              <label className="block text-sm font-[Dosis] mb-2">
                Tên của bạn
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-[Dosis] mb-2">
                Email hoặc số điện thoại
              </label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                className="form-input"
              />
            </div>
          </div>

          <div className="text-left">
            <label className="block text-sm font-[Dosis] mb-3">
              Bạn tham gia được những buổi nào?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ATTEND_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.attend.includes(option.value)}
                    onChange={() => handleAttendChange(option.value)}
                    className="accent-[var(--color-primary)]"
                  />
                  <span className="text-sm font-[Dosis]">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="text-left">
            <label className="block text-sm font-[Dosis] mb-2">
              Bạn có muốn nhắn nhủ điều gì không?
            </label>
            <textarea
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              rows={4}
              className="form-textarea"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-10 py-3 bg-[var(--color-primary)] text-white font-[Dosis] uppercase tracking-wider text-sm hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Đang gửi..." : "Tôi sẽ đến"}
          </button>
        </form>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`toast fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-xl max-w-md text-center ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-amber-500 text-white"
          }`}
        >
          <p className="font-semibold mb-1">
            {toast.type === "success" ? "Cám ơn!!!" : "Xin lỗi!!!"}
          </p>
          <p className="text-sm">{toast.message}</p>
        </div>
      )}
    </section>
  );
}
