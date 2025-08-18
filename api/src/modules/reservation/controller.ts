import { Request, Response } from "express";
import { ZodError } from "zod";
import { ReservationService } from "./service";

// ---- Helpers
function sendError(res: Response, err: unknown) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Geçersiz veri",
      errors: err.flatten(),
    });
  }
  const msg = (err as Error)?.message || "Bilinmeyen hata";

  // Basit mesaj tabanlı eşleme (iş kurallarına göre 404/409/400)
  if (/bulunamadı/i.test(msg)) return res.status(404).json({ message: msg });
  if (/müsait değil/i.test(msg)) return res.status(409).json({ message: msg });

  return res.status(400).json({ message: msg });
}

// ---- Controllers
export async function createReservationHandler(req: Request, res: Response) {
  try {
    const created = await ReservationService.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    return sendError(res, err);
  }
}

export async function getReservationByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.params; // UUID (string)
    const item = await ReservationService.getById(id);
    if (!item) return res.status(404).json({ message: "Rezervasyon bulunamadı" });
    return res.status(200).json(item);
  } catch (err) {
    return sendError(res, err);
  }
}

export async function listReservationsHandler(req: Request, res: Response) {
  try {
    const list = await ReservationService.list(req.query);
    return res.status(200).json(list);
  } catch (err) {
    return sendError(res, err);
  }
}

export async function updateReservationHandler(req: Request, res: Response) {
  try {
    const { id } = req.params; // UUID (string)
    const updated = await ReservationService.update(id, req.body);
    return res.status(200).json(updated);
  } catch (err) {
    return sendError(res, err);
  }
}

export async function deleteReservationHandler(req: Request, res: Response) {
  try {
    const { id } = req.params; // UUID (string)
    await ReservationService.softDelete(id);
    return res.status(204).send();
  } catch (err) {
    return sendError(res, err);
  }
}
