from urllib.parse import urlparse
import re
import tldextract

def check_url(url: str):
    reasons = []
    score = 0

    # Extract domain info
    extracted = tldextract.extract(url)
    domain = extracted.domain
    suffix = extracted.suffix
    subdomains = extracted.subdomain.split(".")

    # Rule 1: Too many hyphens
    if domain.count("-") > 2:
        score += 20
        reasons.append("Too many hyphens in domain")

    # Rule 2: Very long domain name
    if len(domain) > 20:
        score += 20
        reasons.append("Unusually long domain name")

    # Rule 3: No HTTPS
    if not url.startswith("https://"):
        score += 20
        reasons.append("URL does not use HTTPS")

    # Rule 4: IP address instead of domain
    ip_pattern = r"(?:\d{1,3}\.){3}\d{1,3}"
    if re.search(ip_pattern, url):
        score += 40
        reasons.append("URL uses IP address instead of domain")

    # Rule 5: Suspicious TLDs
    bad_tlds = ["xyz", "tk", "top", "buzz", "click", "gq", "ml"]
    if suffix in bad_tlds:
        score += 35
        reasons.append(f"Suspicious top-level domain: .{suffix}")

    # Rule 6: @ symbol trick
    if "@" in url:
        score += 25
        reasons.append("URL contains '@' symbol (phishing trick)")

    # Rule 7: Too many subdomains
    subdomains = extracted.subdomain.split(".")
    if len([s for s in subdomains if s]) >= 1:
        score += 20
        reasons.append("Too many subdomains in URL")

    # Rule 8: Common phishing keywords
    phishing_keywords = ["login", "verify", "secure", "account", "update", "banking"]
    for keyword in phishing_keywords:
        if keyword in url.lower():
            score += 25
            reasons.append(f"Suspicious keyword found in URL: {keyword}")
            break  # stop after first match

    # Decide verdict
    verdict = "safe"
    if score >= 70:
        verdict = "malicious"
    elif score >= 30:
        verdict = "suspicious"

    return {
        "url": url,
        "verdict": verdict,
        "score": score,
        "reasons": reasons
    }
