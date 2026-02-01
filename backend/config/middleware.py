import logging
import time

logger = logging.getLogger('playto')


class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        latency = (time.time() - start_time) * 1000

        logger.info(
            'Request completed',
            extra={
                'method': request.method,
                'path': request.path,
                'status_code': response.status_code,
                'latency_ms': round(latency, 2),
                'user': request.user.username if request.user.is_authenticated else 'anonymous',
            },
        )

        return response
