/* Interface related to Product - Inventory */
export interface Product{
    id: string;
    name: string;
    category: string;
    category_id: number;
    avgBuyPrice: number;
    avgSellPrice: number;
    profitLoss: number;
    stock: number;
    unit: string;
    note: string;
    is_active: boolean;
}

export interface Category{
    id: string;
    name: string;
}