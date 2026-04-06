import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function removeFiles(req, res) {
  const { image } = req.body;
  try {
    if (image) {
      const slicedImage = image.slice(30);
      const filePath = path.join(__dirname, "..", "uploads", slicedImage);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          return res.status(200).json({ message: "fayl o'chirildi" });
        } else {
          console.warn(`File not found: ${filePath}`);
          return res.status(404).json({ message: "fayl topilmadi" });
        }
      } catch (err) {
        console.error(`Failed to delete image: ${filePath}`, err);
        return res.status(500).json({ message: "Faylni o'chirishda xatolik" });
      }
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: error.message });
  }
}
