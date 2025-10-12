import { getEventList } from '@/api/eventApi';
import type { EventItem } from '@/app/dashboard/events/components/eventMocks';
import { convertBackendEventToFrontend } from '@/app/dashboard/events/components/eventUtils';

import { useEffect, useRef, useState } from 'react';

/**
 * Calculate page size based on screen width
 * Since EventList uses vertical layout (1 card per row), page size = number of cards per page
 */
function getPageSizeByScreenWidth(): number {
  if (typeof window === 'undefined') return 5; // SSR fallback

  const width = window.innerWidth;
  if (width >= 2560) return 8; // Ultra-wide / 4K
  if (width >= 1920) return 5; // Full HD 1920x1080 (vertical list, 5 cards)
  if (width >= 1440) return 5; // Medium-large screen
  if (width >= 1024) return 4; // Standard desktop
  if (width >= 768) return 3; // Tablet
  return 2; // Mobile
}

/**
 * Custom hook for responsive page size
 */
export function useResponsivePageSize() {
  const [pageSize, setPageSize] = useState(getPageSizeByScreenWidth());

  useEffect(() => {
    const handleResize = () => {
      const newPageSize = getPageSizeByScreenWidth();
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pageSize]);

  return pageSize;
}

/**
 * Custom hook to load and manage events
 */
export function useEventManagement(
  orgId: string | undefined,
  currentPage: number,
  pageSize: number,
) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [_loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const loadEvents = async () => {
    if (!orgId) return;

    try {
      setLoading(true);
      const response = await getEventList({ orgId, pageNumber: currentPage, pageSize });
      const frontendEvents = response.events.map(convertBackendEventToFrontend);
      setEvents(frontendEvents);
      setTotalPages(response.totalPages);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId, currentPage, pageSize, refreshTrigger]);

  const reload = () => setRefreshTrigger(prev => prev + 1);

  return { events, setEvents, totalPages, reload };
}

/**
 * Custom hook to reset page when page size changes
 */
export function usePageSizeReset(pageSize: number, setCurrentPage: (page: number) => void) {
  const prevPageSize = useRef(pageSize);
  useEffect(() => {
    if (prevPageSize.current !== pageSize) {
      setCurrentPage(1);
      prevPageSize.current = pageSize;
    }
  }, [pageSize, setCurrentPage]);
}
