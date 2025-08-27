"use client";

import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
	className?: string;
	variant?: 'rect' | 'text' | 'circle';
}

export default function Skeleton({ className, variant = 'rect' }: SkeletonProps) {
	const radius = variant === 'circle' ? 'rounded-full' : 'rounded-md';
	const height = variant === 'text' ? 'h-4' : '';
	return (
		<div
			className={clsx(
				'animate-pulse bg-gray-200 dark:bg-gray-700',
				radius,
				height,
				className
			)}
		/>
	);
} 