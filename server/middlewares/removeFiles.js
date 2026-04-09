import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function removeFileByUrl(fileUrl) {
  if (!fileUrl) return false;

  try {
    const parsedUrl = new URL(fileUrl);
    const fileName = path.basename(parsedUrl.pathname);
    const filePath = path.join(__dirname, "..", "uploads", fileName);

    if (!fs.existsSync(filePath)) {
      return false;
    }

    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    console.error("Failed to remove file:", error);
    return false;
  }
}

export async function removeFiles(req, res) {
  const targetFile = req.body.file || req.body.image;
  try {
    if (!targetFile) {
      return res.status(400).json({ message: "File is required." });
    }

    if (removeFileByUrl(targetFile)) {
      return res.status(200).json({ message: "fayl o'chirildi" });
    }

    return res.status(404).json({ message: "fayl topilmadi" });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: error.message });
  }
}
