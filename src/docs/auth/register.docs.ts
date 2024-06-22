/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               fullName:
 *                  type: string
 *             required:
 *               - username
 *               - password
 *               - phoneNumber
 *               - fullName
 *     responses:
 *       201:
 *         description: Registration successful
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
 *       400:
 *         description: Username exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: USERNAME_EXIST;
 *                 status: error;
 *                 statusCode: 400;
 *       401:
 *         description: Phonenumber exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   message: USERNAME_EXIST;
 *                   status: error;
 *                   statusCode: 400;
 */
