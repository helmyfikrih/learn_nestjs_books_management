export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export function generatePaginationMeta(
    total: number,
    page: number,
    limit: number
): PaginationMeta {
    const totalPages = Math.ceil(total / limit);

    return {
        total,
        page,
        limit,
        totalPages,
    };
}
