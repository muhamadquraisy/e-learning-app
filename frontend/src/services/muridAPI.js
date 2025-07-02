// src/services/muridAPI.js
import axios from 'axios';

const API_BASE_URL = '/api/murid'; // Base path, bisa dikembangkan nanti

/**
 * Ambil statistik murid berdasarkan ID
 * @param {string} id - ID murid
 * @returns {Promise<Object>} - Data statistik murid
 */
export const fetchStatistikMurid = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistik/${id}`);
    return response;
  } catch (error) {
    console.error('Error saat mengambil data statistik murid:', error);
    throw error;
  }
};