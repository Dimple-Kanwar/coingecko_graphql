import {gql} from "apollo-server";

//Define graphQL Schema
const typeDefs = gql`

    type Coin {
        id: String
        symbol: String
        name: String
        current_price: Float
        market_cap: Float
    }

    type HistoricalData {
        prices: [[Float]]
        market_caps: [[Float]]
    }

    type Query {
        getCoinData(id: String!): Coin
        getHistoricalData(id: String!, days: Int!): HistoricalData
    }
`
export default typeDefs;