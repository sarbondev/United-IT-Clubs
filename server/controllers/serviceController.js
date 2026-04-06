import Service from "../models/service.js";

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Xizmat topilmadi!" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNewService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newService = new Service({
      title,
      description,
    });
    await newService.save();
    return res.status(201).json({
      message: "Yangi xizmat yaratildi!",
      servis: newService,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedService) {
      return res.status(404).json({ message: "Xizmat topilmadi!" });
    }
    res.status(200).json({
      message: "Service updated successfully!",
      servis: updatedService,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Xizmat topilmadi!" });
    res.status(200).json({ message: "Xizmat o'chirildi!", service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
