import { BadRequestException } from '@nestjs/common';

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export function generatePaginationMeta(total: number, page: number, limit: number): PaginationMeta {
    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}

export function getPaginationParams(
    pageInput?: number | string,
    limitInput?: number | string,
): { page: number; limit: number; skip: number } {
    const page = parseInt(pageInput as string, 10) || 1;
    const limit = parseInt(limitInput as string, 10) || 2;

    if (isNaN(page) || isNaN(limit)) {
        throw new BadRequestException('Page and limit must be valid numbers');
    }

    const skip = (page - 1) * limit;

    return { page, limit, skip };
}

