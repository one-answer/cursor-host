import axios from 'axios';

/**
 * Fetches IP address for a given domain using a public DNS API
 * @param {string} domain - The domain to resolve
 * @returns {Promise<{ip: string|null}>} - The resolved IP or null if failed
 */
export const fetchDomainIps = async (domain) => {
  try {
    // Using public DNS API to resolve domain
    const response = await axios.get(`https://dns.google/resolve?name=${domain}&type=A`);
    
    if (response.data && response.data.Answer && response.data.Answer.length > 0) {
      // Get the first A record
      const aRecord = response.data.Answer.find(record => record.type === 1);
      if (aRecord) {
        return { ip: aRecord.data };
      }
    }
    
    // If no valid IP found
    console.warn(`No valid IP found for domain: ${domain}`);
    return { ip: null };
  } catch (error) {
    console.error(`Error resolving domain ${domain}:`, error);
    return { ip: null };
  }
};