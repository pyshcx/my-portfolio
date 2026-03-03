"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

/**
 * Shared carousel hook for Experiences and Projects sections.
 * Handles mount state, responsive breakpoints, auto-scroll,
 * prev/next/goTo navigation, keyboard, touch-swipe, mouse-drag,
 * and prefers-reduced-motion.
 *
 * @param {Array} items - The array of data items to display.
 * @param {Object} [options]
 * @param {number} [options.autoScrollInterval=5000] - ms between auto-advances.
 * @param {number} [options.pauseDuration=2000] - ms to pause auto-scroll after user interaction.
 * @param {number} [options.touchSwipeThreshold=50] - min px for a touch swipe.
 * @param {number} [options.mouseSwipeThreshold=80] - min px for a mouse drag.
 */
export function useCarousel(items, options = {}) {
    const {
        autoScrollInterval = 5000,
        pauseDuration = 2000,
        touchSwipeThreshold = 50,
        mouseSwipeThreshold = 80,
    } = options;

    const count = items.length;
    const maxIndex = count - 1;

    /* ── state ──────────────────────────────────────── */
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [screenSize, setScreenSize] = useState({ width: 1024, height: 768 });

    /* ── refs ───────────────────────────────────────── */
    const containerRef = useRef(null);
    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const isDragging = useRef(false);
    const pauseTimerRef = useRef(null);

    /* ── derived ────────────────────────────────────── */
    const isMobile = screenSize.width < 768;
    const isTablet = screenSize.width >= 768 && screenSize.width < 1024;

    /* ── 1. Mount handling ──────────────────────────── */
    useEffect(() => {
        setIsMounted(true);
    }, []);

    /* ── 2. Screen-size tracking ────────────────────── */
    useEffect(() => {
        if (!isMounted) return;

        const update = () => {
            setScreenSize({ width: window.innerWidth, height: window.innerHeight });
        };

        update();
        window.addEventListener("resize", update, { passive: true });
        return () => window.removeEventListener("resize", update);
    }, [isMounted]);

    /* ── helper: pause then resume auto-scroll ──────── */
    const pauseTemporarily = useCallback(() => {
        setIsPaused(true);
        if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = setTimeout(() => setIsPaused(false), pauseDuration);
    }, [pauseDuration]);

    // Clean up pause timer on unmount
    useEffect(() => {
        return () => {
            if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
        };
    }, []);

    /* ── 3. Auto-scroll ─────────────────────────────── */
    useEffect(() => {
        if (isPaused || !isMounted) return;
        const id = setInterval(() => {
            setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, autoScrollInterval);
        return () => clearInterval(id);
    }, [isPaused, maxIndex, isMounted, autoScrollInterval]);

    /* ── 4. Navigation ──────────────────────────────── */
    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const goToSlide = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    /* ── 5. Keyboard controls ───────────────────────── */
    useEffect(() => {
        if (!isMounted) return;

        const onKey = (e) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                prevSlide();
                pauseTemporarily();
            }
            if (e.key === "ArrowRight") {
                e.preventDefault();
                nextSlide();
                pauseTemporarily();
            }
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [prevSlide, nextSlide, isMounted, pauseTemporarily]);

    /* ── 6. Touch / Swipe ───────────────────────────── */
    const handleTouchStart = useCallback((e) => {
        const touch = e.touches[0];
        touchStartX.current = touch.clientX;
        touchStartY.current = touch.clientY;
        isDragging.current = false;
        setIsPaused(true);
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!touchStartX.current || !touchStartY.current) return;

        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - touchStartX.current);
        const deltaY = Math.abs(touch.clientY - touchStartY.current);

        if (deltaX > deltaY && deltaX > 10) {
            e.preventDefault();
            isDragging.current = true;
        }
    }, []);

    const handleTouchEnd = useCallback(
        (e) => {
            if (!touchStartX.current || !isDragging.current) {
                setIsPaused(false);
                return;
            }

            const touch = e.changedTouches[0];
            const deltaX = touchStartX.current - touch.clientX;

            if (Math.abs(deltaX) > touchSwipeThreshold) {
                deltaX > 0 ? nextSlide() : prevSlide();
            }

            touchStartX.current = null;
            touchStartY.current = null;
            isDragging.current = false;
            pauseTemporarily();
        },
        [nextSlide, prevSlide, touchSwipeThreshold, pauseTemporarily]
    );

    /* ── 7. Mouse drag (desktop) ────────────────────── */
    const handleMouseDown = useCallback(
        (e) => {
            if (isMobile) return;
            touchStartX.current = e.clientX;
            isDragging.current = false;
            setIsPaused(true);
        },
        [isMobile]
    );

    const handleMouseMove = useCallback(
        (e) => {
            if (isMobile || !touchStartX.current) return;
            if (Math.abs(e.clientX - touchStartX.current) > 10) {
                isDragging.current = true;
            }
        },
        [isMobile]
    );

    const handleMouseUp = useCallback(
        (e) => {
            if (isMobile || !touchStartX.current || !isDragging.current) {
                setIsPaused(false);
                return;
            }

            const deltaX = touchStartX.current - e.clientX;

            if (Math.abs(deltaX) > mouseSwipeThreshold) {
                deltaX > 0 ? nextSlide() : prevSlide();
            }

            touchStartX.current = null;
            isDragging.current = false;
            pauseTemporarily();
        },
        [isMobile, nextSlide, prevSlide, mouseSwipeThreshold, pauseTemporarily]
    );

    /* ── 8. Visible items ───────────────────────────── */
    const visibleItems = useMemo(() => {
        if (isMobile) {
            return [{ ...items[activeIndex], originalIndex: activeIndex }];
        }
        const visibleCount = isTablet ? 2 : 3;
        return Array.from({ length: visibleCount }, (_, i) => {
            const index = (activeIndex + i) % count;
            return { ...items[index], originalIndex: index };
        });
    }, [activeIndex, count, isMobile, isTablet, items]);

    /* ── 9. Reduced motion ──────────────────────────── */
    const prefersReducedMotion = useMemo(() => {
        if (!isMounted) return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, [isMounted]);

    /* ── 10. Grid class ─────────────────────────────── */
    const gridClass = isMobile
        ? "grid-cols-1"
        : isTablet
            ? "grid-cols-2"
            : "grid-cols-1 lg:grid-cols-3";

    /* ── Public API ─────────────────────────────────── */
    return {
        activeIndex,
        isMounted,
        isMobile,
        isTablet,
        prefersReducedMotion,
        visibleItems,
        gridClass,
        containerRef,
        count,

        // Navigation
        prevSlide,
        nextSlide,
        goToSlide,
        pauseTemporarily,

        // Event handlers (spread onto the swipe container)
        swipeHandlers: {
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: handleMouseUp,
            onMouseLeave: handleMouseUp,
        },
    };
}
