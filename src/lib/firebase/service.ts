/**
 * Firestore Service Layer
 * 
 * Collections:
 *   users/{uid}               — profile, business metadata
 *   users/{uid}/products      — inventory products
 *   users/{uid}/sales         — sales records
 *   users/{uid}/transactions  — pay transactions
 *   users/{uid}/purchases     — purchase orders
 *   users/{uid}/customers     — CRM customers
 *   users/{uid}/suppliers     — CRM suppliers
 *   users/{uid}/employees     — HR roster
 *   users/{uid}/quotations    — sales quotations
 */

import {
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    serverTimestamp,
    onSnapshot,
    QueryConstraint,
    DocumentData,
    WithFieldValue,
} from "firebase/firestore";
import { db } from "./config";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Product {
    id?: string;
    name: string;
    sku: string;
    category: string;
    price: number;
    costPrice: number;
    stock: number;
    lowStockThreshold: number;
    status: "In Stock" | "Low Stock" | "Out of Stock";
    image?: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface Sale {
    id?: string;
    customerId?: string;
    customerName: string;
    items: SaleItem[];
    totalAmount: number;
    paymentMethod: "Cash" | "Card" | "Transfer" | "POS";
    status: "Completed" | "Processing" | "Cancelled" | "Refunded";
    notes?: string;
    createdAt?: Timestamp;
}

export interface SaleItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Transaction {
    id?: string;
    type: "Credit" | "Debit";
    amount: number;
    description: string;
    reference?: string;
    status: "Success" | "Pending" | "Failed";
    source?: string; // bank name, wallet, etc.
    createdAt?: Timestamp;
}

export interface Customer {
    id?: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    totalPurchases: number;
    totalSpent: number;
    createdAt?: Timestamp;
}

export interface Supplier {
    id?: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    productsSupplied?: string[];
    createdAt?: Timestamp;
}

export interface Employee {
    id?: string;
    name: string;
    role: string;
    email?: string;
    phone?: string;
    department?: string;
    accessLevel?: string;
    salary?: number;
    startDate?: string;
    status: "Active" | "Inactive";
    createdAt?: Timestamp;
}

export interface Purchase {
    id?: string;
    supplierId?: string;
    supplierName: string;
    items: PurchaseItem[];
    totalAmount: number;
    status: "Pending" | "Received" | "Cancelled";
    expectedDate?: string;
    createdAt?: Timestamp;
}

export interface PurchaseItem {
    productId?: string;
    productName: string;
    quantity: number;
    unitCost: number;
}

export interface Quotation {
    id?: string;
    clientName: string;
    items: number;
    totalAmount: number;
    validDays?: number;
    notes?: string;
    status: "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired";
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Root collection path scoped to user */
const userCol = (uid: string, col: string) =>
    collection(db, "users", uid, col);

const userDoc = (uid: string, col: string, id: string) =>
    doc(db, "users", uid, col, id);

// ─── Generic CRUD ─────────────────────────────────────────────────────────────

async function addDocument<T extends DocumentData>(
    uid: string,
    colName: string,
    data: WithFieldValue<T>
): Promise<string> {
    const ref = await addDoc(userCol(uid, colName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return ref.id;
}

async function setDocument<T extends DocumentData>(
    uid: string,
    colName: string,
    id: string,
    data: WithFieldValue<T>
): Promise<void> {
    await setDoc(userDoc(uid, colName, id), {
        ...data,
        updatedAt: serverTimestamp(),
    }, { merge: true });
}

async function updateDocument(
    uid: string,
    colName: string,
    id: string,
    data: Partial<DocumentData>
): Promise<void> {
    await updateDoc(userDoc(uid, colName, id), {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

async function deleteDocument(uid: string, colName: string, id: string): Promise<void> {
    await deleteDoc(userDoc(uid, colName, id));
}

async function listDocuments<T>(uid: string, colName: string, constraints: QueryConstraint[] = []): Promise<T[]> {
    const q = query(userCol(uid, colName), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as T));
}

// ─── Real-time helpers ────────────────────────────────────────────────────────

export function subscribeToCollection<T>(
    uid: string,
    colName: string,
    constraints: QueryConstraint[],
    callback: (data: T[]) => void
) {
    const q = query(userCol(uid, colName), ...constraints);
    return onSnapshot(q, (snap) => {
        callback(snap.docs.map(d => ({ id: d.id, ...d.data() } as T)));
    });
}

// ─── Products ─────────────────────────────────────────────────────────────────

export const productsService = {
    list: (uid: string) =>
        listDocuments<Product>(uid, "products", [orderBy("createdAt", "desc")]),

    add: (uid: string, data: Omit<Product, "id" | "createdAt" | "updatedAt">) =>
        addDocument(uid, "products", data),

    update: (uid: string, id: string, data: Partial<Product>) =>
        updateDocument(uid, "products", id, data),

    remove: (uid: string, id: string) =>
        deleteDocument(uid, "products", id),

    subscribe: (uid: string, cb: (products: Product[]) => void) =>
        subscribeToCollection<Product>(uid, "products", [orderBy("createdAt", "desc")], cb),
};

// ─── Sales ────────────────────────────────────────────────────────────────────

export const salesService = {
    list: (uid: string, limitN = 50) =>
        listDocuments<Sale>(uid, "sales", [orderBy("createdAt", "desc"), limit(limitN)]),

    add: (uid: string, data: Omit<Sale, "id" | "createdAt">) =>
        addDocument(uid, "sales", data),

    update: (uid: string, id: string, data: Partial<Sale>) =>
        updateDocument(uid, "sales", id, data),

    remove: (uid: string, id: string) =>
        deleteDocument(uid, "sales", id),

    subscribe: (uid: string, cb: (sales: Sale[]) => void) =>
        subscribeToCollection<Sale>(uid, "sales", [orderBy("createdAt", "desc"), limit(50)], cb),
};

// ─── Transactions (Aider Pay) ─────────────────────────────────────────────────

export const transactionsService = {
    list: (uid: string, limitN = 30) =>
        listDocuments<Transaction>(uid, "transactions", [orderBy("createdAt", "desc"), limit(limitN)]),

    add: (uid: string, data: Omit<Transaction, "id" | "createdAt">) =>
        addDocument(uid, "transactions", data),

    subscribe: (uid: string, cb: (txns: Transaction[]) => void) =>
        subscribeToCollection<Transaction>(uid, "transactions", [orderBy("createdAt", "desc"), limit(30)], cb),
};

// ─── Customers ────────────────────────────────────────────────────────────────

export const customersService = {
    list: (uid: string) =>
        listDocuments<Customer>(uid, "customers", [orderBy("name")]),

    add: (uid: string, data: Omit<Customer, "id" | "createdAt">) =>
        addDocument(uid, "customers", data),

    update: (uid: string, id: string, data: Partial<Customer>) =>
        updateDocument(uid, "customers", id, data),

    remove: (uid: string, id: string) =>
        deleteDocument(uid, "customers", id),

    subscribe: (uid: string, cb: (customers: Customer[]) => void) =>
        subscribeToCollection<Customer>(uid, "customers", [orderBy("name")], cb),
};

// ─── Suppliers ────────────────────────────────────────────────────────────────

export const suppliersService = {
    list: (uid: string) =>
        listDocuments<Supplier>(uid, "suppliers", [orderBy("name")]),

    add: (uid: string, data: Omit<Supplier, "id" | "createdAt">) =>
        addDocument(uid, "suppliers", data),

    update: (uid: string, id: string, data: Partial<Supplier>) =>
        updateDocument(uid, "suppliers", id, data),

    remove: (uid: string, id: string) =>
        deleteDocument(uid, "suppliers", id),
};

// ─── Employees ────────────────────────────────────────────────────────────────

export const employeesService = {
    list: (uid: string) =>
        listDocuments<Employee>(uid, "employees", [orderBy("name")]),

    add: (uid: string, data: Omit<Employee, "id" | "createdAt">) =>
        addDocument(uid, "employees", data),

    update: (uid: string, id: string, data: Partial<Employee>) =>
        updateDocument(uid, "employees", id, data),

    remove: (uid: string, id: string) =>
        deleteDocument(uid, "employees", id),
};

// ─── Purchases ────────────────────────────────────────────────────────────────

export const purchasesService = {
    list: (uid: string) =>
        listDocuments<Purchase>(uid, "purchases", [orderBy("createdAt", "desc")]),

    add: (uid: string, data: Omit<Purchase, "id" | "createdAt">) =>
        addDocument(uid, "purchases", data),

    update: (uid: string, id: string, data: Partial<Purchase>) =>
        updateDocument(uid, "purchases", id, data),

    remove: (uid: string, id: string) =>
        deleteDocument(uid, "purchases", id),

    subscribe: (uid: string, cb: (purchases: Purchase[]) => void) =>
        subscribeToCollection<Purchase>(uid, "purchases", [orderBy("createdAt", "desc")], cb),
};

// ─── Quotations ───────────────────────────────────────────────────────────────

export const quotationsService = {
    list: (uid: string) =>
        listDocuments<Quotation>(uid, "quotations", [orderBy("createdAt", "desc")]),

    add: (uid: string, data: Omit<Quotation, "id" | "createdAt" | "updatedAt">) =>
        addDocument(uid, "quotations", data),

    update: (uid: string, id: string, data: Partial<Quotation>) =>
        updateDocument(uid, "quotations", id, data),

    remove: (uid: string, id: string) =>
        deleteDocument(uid, "quotations", id),

    subscribe: (uid: string, cb: (quotations: Quotation[]) => void) =>
        subscribeToCollection<Quotation>(uid, "quotations", [orderBy("createdAt", "desc")], cb),
};

// ─── User Profile ──────────────────────────────────────────────────────────────

export const userService = {
    get: async (uid: string) => {
        const snap = await getDoc(doc(db, "users", uid));
        return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    },
    set: (uid: string, data: Record<string, unknown>) =>
        setDoc(doc(db, "users", uid), { ...data, updatedAt: serverTimestamp() }, { merge: true }),
};

// ─── Dashboard Aggregates ──────────────────────────────────────────────────────

export async function getDashboardStats(uid: string) {
    const [sales, products] = await Promise.all([
        listDocuments<Sale>(uid, "sales", [where("status", "==", "Completed")]),
        listDocuments<Product>(uid, "products", []),
    ]);

    const totalSales = sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
    const lowStockCount = products.filter(p => p.status === "Low Stock" || p.status === "Out of Stock").length;
    const recentSales = sales.slice(0, 5);

    return {
        totalSales,
        totalOrders: sales.length,
        totalProducts: products.length,
        lowStockCount,
        recentSales,
    };
}
