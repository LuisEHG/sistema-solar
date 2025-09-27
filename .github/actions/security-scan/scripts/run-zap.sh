#!/usr/bin/env bash
# .github/actions/security-scan/scripts/run-zap.sh
TARGET_URL="$1"
set -e

echo "Running OWASP ZAP API scan against $TARGET_URL"

# Ejecuta ZAP en modo contenedor (requiere docker disponible en runner)
docker run --rm -v "$(pwd)":/zap/wrk/:rw ghcr.io/zaproxy/zaproxy zap-baseline.py -t "$TARGET_URL" -r zap_report.html || true

# También puedes usar zap-full-scan.py para DAST más profundo
