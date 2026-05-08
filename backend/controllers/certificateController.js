/**
 * Certificate Controller
 * Handles all certificate CRUD operations
 */

const Certificate = require('../models/Certificate');

/**
 * Generate unique Certificate ID in format AMAN-YYYY-NNN
 */
const generateCertificateId = async () => {
  const year = new Date().getFullYear();
  const prefix = `AMAN-${year}-`;

  // Find the latest certificate for this year
  const latest = await Certificate.findOne({
    certificateId: { $regex: `^${prefix}` },
  }).sort({ createdAt: -1 });

  let nextNum = 1;
  if (latest) {
    const lastNum = parseInt(latest.certificateId.split('-')[2], 10);
    nextNum = lastNum + 1;
  }

  // Pad with leading zeros (e.g., 001, 012, 100)
  return `${prefix}${String(nextNum).padStart(3, '0')}`;
};

// ─── POST /api/certificates ───────────────────────────────────────────────────
const createCertificate = async (req, res) => {
  try {
    const { fullName, role, eventName, date } = req.body;

    // Validate required fields
    if (!fullName || !role || !eventName || !date) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Generate unique certificate ID
    const certificateId = await generateCertificateId();

    const certificate = await Certificate.create({
      certificateId,
      fullName,
      role,
      eventName,
      date,
    });

    res.status(201).json({
      success: true,
      message: 'Certificate created successfully!',
      data: certificate,
    });
  } catch (error) {
    console.error('Create certificate error:', error);
    res.status(500).json({ message: 'Server error. Could not create certificate.' });
  }
};

// ─── GET /api/certificates ────────────────────────────────────────────────────
const getAllCertificates = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // Search by name or certificate ID
    if (search) {
      query = {
        $or: [
          { fullName: { $regex: search, $options: 'i' } },
          { certificateId: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const certificates = await Certificate.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ─── GET /api/certificates/:id ────────────────────────────────────────────────
const getCertificateById = async (req, res) => {
  try {
    // Support both MongoDB _id and certificateId (AMAN-YYYY-NNN)
    const { id } = req.params;
    let certificate;

    if (id.startsWith('AMAN-')) {
      certificate = await Certificate.findOne({ certificateId: id });
    } else {
      certificate = await Certificate.findById(id);
    }

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found.' });
    }

    res.json({ success: true, data: certificate });
  } catch (error) {
    console.error('Get certificate by ID error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ─── DELETE /api/certificates/:id ────────────────────────────────────────────
const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found.' });
    }

    res.json({ success: true, message: 'Certificate deleted successfully.' });
  } catch (error) {
    console.error('Delete certificate error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  deleteCertificate,
};
