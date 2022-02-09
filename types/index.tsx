export interface IAccount {
    id?: number,
    name: string, 
    amount: number //for statistic
}

export interface ICategory {
    id?: number,
    name: string,
    icon: string, 
    type: TransactionType,
    amount: number //for statistic
}

export interface ITransaction {
    id?: number,
    amount: number, // if type Expenses - negative
    idCategory: number,
    idAccount: number,
    date: Date,
    comment: string,
}

export enum TransactionType {
    Expenses = "Expenses",
    Income = "Income",
}

export enum DialogMode { 
    Edit = "Edit",
    Add = "Add"
}

export const AvailableIcons: {iconName: string}[] = [
    {iconName: "account"},
    {iconName: "airplane"},
    {iconName: "alarm"},
    {iconName: "account-supervisor"},
    {iconName: "android"},
    {iconName: "apple"},
    {iconName: "basket"},
    {iconName: "bank"},
    {iconName: "basketball"},
    {iconName: "bike"},
    {iconName: "bread-slice"},
    {iconName: "briefcase"},
    {iconName: "bus"},
    {iconName: "cards"},
    {iconName: "volleyball"},
    {iconName: "gift"},
    {iconName: "teach"},
    {iconName: "laptop"},
    {iconName: "bank-plus"},
    {iconName: "bank-minus"},
    {iconName: "food"},
    {iconName: "home"},
];

export const ChartColors = [
    "#8bc34a",
    "#2196f3",
    "#3f51b5",
    "#673ab7",
    "#9c27b0",
    "#e91e63",
    "#e91e63",   
    "#ff9800",
    "#ffc107",
    "#ffeb3b",
]
