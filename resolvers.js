import axios from "axios";
import("dotenv/config");

const COINGECKO_BASE_URL = 'http://api.coingecko.com/api/v3';
const API_KEY = process.env.COINGECKO_API_KEY;

const resolvers = {
    Query: {
         // Fetch current market data for a specific coin
        async getCoinData(_, { id }) {
            try {
                const response = await axios.get(`${COINGECKO_BASE_URL}/coins/markets`, {
                    params: {
                        vs_currency: 'inr',
                        ids: id
                    },
                    headers: {
                        'x-api-key': API_KEY
                    }
                });
                return response.data[0]; // Return first result
            } catch (error) {
                console.log("Error fetching current coin data: ", error.response.data);
                console.log(Object.keys(error));
                throw new Error("Could not fetch coin data");
            }
        },
        // Fetch historical data for a specific coin
        async getHistoricalData(_, { id, days }) {
            try {
                const response = await axios.get(`${COINGECKO_BASE_URL}/coins/${id}/market_chart`,{
                    params: {
                        vs_currency: 'usd',
                        days
                    },
                    headers: {
                        'x-api-key': API_KEY
                    }
                });
                return response.data;
            } catch (error) {
                console.log("Error while fetching historical data of the specific coin:", error);
                throw new Error(error.message);
            } 
        }
    }
}

export default resolvers;