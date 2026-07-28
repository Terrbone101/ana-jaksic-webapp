export interface BookingRecord {
  courseId: string;
  courseTitle: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  paymentMethod: "paypal" | "stripe" | "pending";
  createdAt: string;
}

const KEY = "ana-jaksic-bookings";

export function saveBooking(record: BookingRecord) {
  const existing = getBookings();
  existing.push(record);
  localStorage.setItem(KEY, JSON.stringify(existing));
}

export function getBookings(): BookingRecord[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
