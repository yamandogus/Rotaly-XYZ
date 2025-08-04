import { Router } from "express";
import { UserController } from "./controller";
import { validateBody, validateId } from "../../middleware/validate.middleware";
import { RegisterSchemaType, UpdateUserSchemaType } from "../../dto/auth/index";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

export default router;

/**
 * ID'ye göre kullanıcı getir
 * @route GET /api/users/:id
 * @access Private
 */

/**
 * Email'e göre kullanıcı getir
 * @route GET /api/users/email/:email
 * @access Private (Admin only)
 */

/**
 * Telefon numarasına göre kullanıcı getir
 * @route GET /api/users/phone/:phone
 * @access Private (Admin only)
 */

/**
   * Yeni kullanıcı ekle
   * @route POST /api/users
   * @access Private (Admin only)


  /**
   * Kullanıcı bilgilerini güncelle
   * @route PUT /api/users/:id
   * @access Private
   */

/**
 * Kullanıcıyı sil (soft delete)
 * @route DELETE /api/users/:id
 * @access Private (Admin only)
 */

/**
 * Kendi profilini getir
 * @route GET /api/users/me
 * @access Private
 */

/**
 * Kendi profilini güncelle
 * @route PUT /api/users/me
 * @access Private
 */
