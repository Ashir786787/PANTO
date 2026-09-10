import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Bang Upin",
    role: "Pedagang Asongan",
    quote:
      "Terimakasih banyak, kini ruanganku menjadi lebih mewah dan terlihat mahal",
    rating: 4,
    photo: "/images/testimonial-1.jpg",
    avatar: "/images/client-card-1.jpg",
  },
  {
    id: 2,
    name: "Ibuk Sukijan",
    role: "Ibu Rumah Tangga",
    quote:
      "Makasih Panto, aku sekarang berasa tinggal di apartment karena barang-barang yang terlihat mewah",
    rating: 4,
    photo: "/images/testimonial-2.jpg",
    avatar: "/images/client-card-2.jpg",
    avatarBoost: true,
  },
  {
    id: 3,
    name: "Mpok Ina",
    role: "Karyawan Swasta",
    quote:
      "Sangat terjangkau untuk kantong saya yang tidak terlalu banyak",
    rating: 4,
    photo: "/images/testimonial-3.png",
    avatar: "/images/client-card-3.jpg",
  },
];