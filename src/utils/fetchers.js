import axiosInstance from '../config/axiosConfig';

//New code
export const fetchuserAccounts = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user-accounts/${userId}`);

    if (!response.data || !response.data.length) {
      throw new Error('No user accounts found.');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching accounts:', error.message);
    throw new Error(`Failed to fetch accounts: ${error.message}`);
  }
};

export const fetchAlerts = async (email) => {
  try {
    const response = await axiosInstance.get(`/alerts/${email}`);

    if (!response.data || !response.data.length) {
      throw new Error('No alerts found.');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error.message);
    throw new Error(`Failed to fetch alerts: ${error.message}`);
  }
};

export const fetchDashboardData = async (userId) => {
  try {
    const response = await axiosInstance.get(`/dashboard/${userId}`);

    
    return response.data ?? {};

  } catch (error) {
    console.error('Error fetching accounts:', error.message);
    throw new Error(`Failed to fetch accounts: ${error.message}`);
  }
};

export const fetchTransactions = async (userId) => {
  try {
    const response = await axiosInstance.get(`/transactions/${userId}`);

    if (!response.data || !response.data.length) {
      throw new Error('No user accounts found.');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching Transactions', error.message);
    throw new Error(`Failed to Units: ${error.message}`);
  }
};

export const performTransfer = async (data) => {
  try {
    const res = await axiosInstance.post("transactions/transfer", data);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message || "Transfer failed");
    }

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || "Transfer failed");
  }
};



export const fetchAccountById = async (accountId) => {
  try {
    const response = await axiosInstance.get(`/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch account: " + error.message);
  }
};

export const createAccount = async (accountData) => {
  try {
    const response = await axiosInstance.post("/accounts/create", accountData);
    return response.data;
  } catch (error) {
    console.error("Error creating account:", error.message);
    throw new Error(error.response?.data?.message || "Failed to create account");
  }
};

export const performTransaction = async ({ accountId, amount, currency, type }) => {
  try {
    const response = await axiosInstance.post(`/transactions/${type}`, {
      accountId,
      amount,
      currency,
    });

    return response.data;
  } catch (error) {
    console.error("Transaction error:", error.message);
    throw new Error(error.response?.data?.message || "Transaction failed");
  }
};
