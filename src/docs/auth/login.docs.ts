/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - phoneNumber
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                     type: object
 *                     properties:
 *                       _id: string
 *                       username: string
 *                       phoneNumber: string
 *                       fullName: string
 *                       isActive: boolean
 *                       followers: number
 *                       price: number
 *                       balance: number
 *                       profilePhoto: string
 *                       coverPhoto: string
 *                       socialMedia:
 *                          type: object
 *                          properties:
 *                              facebook: string
 *                              instagram: string
 *                              linkedin: string
 *                              telegram: string
 *       404:
 *         description: USER_NOT_FOUND
 *
 *       400:
 *          description: INVALID_PASSWORD
 */
