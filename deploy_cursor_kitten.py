import ftplib
import os
import time
from datetime import datetime
import io  # <-- Add this import for log injection to work

# === FTP Settings ===
FTP_HOST = "192.168.1.180"
FTP_PORT = 1337
FTP_USER = "anonymous"
FTP_PASS = ""

# === File Mappings ===
UPLOADS = {
    "./releases/VitaShell.vpk": "ux0:/VitaShell.vpk",
    "./payloads/athenamist/boot_config.json": "ux0:/athenamist/boot_config.json",
    "./payloads/athenamist/blackops_boot.lua": "ux0:/athenamist/blackops_boot.lua",
    "./tai-config/primary.txt": "ur0:/tai/config.txt",
}

# === Log Injection ===
LOG_PATH = "ux0:/athenamist/logs/blackops.json"
TRIGGER_LOG = "ux0:/athenamist/signals/trigger.log"

def upload_file(ftp, local_path, remote_path):
    with open(local_path, "rb") as f:
        print(f"🐾 Uploading {local_path} → {remote_path}")
        ftp.storbinary(f"STOR {remote_path}", f)
        print("✅ Done.")

def inject_log(ftp, path, message):
    try:
        data = f"\n[{datetime.now().isoformat()}] {message}\n"
        ftp.storbinary(f"APPE {path}", io.BytesIO(data.encode()))
        print(f"📝 Log updated: {message}")
    except Exception as e:
        print(f"⚠️ Log injection failed: {e}")

def main():
    try:
        print(f"📡 Connecting to FTP at {FTP_HOST}:{FTP_PORT}...")
        ftp = ftplib.FTP()
        ftp.connect(FTP_HOST, FTP_PORT)
        ftp.login(FTP_USER, FTP_PASS)
        print("🔒 Connected.")

        # Upload files
        for local, remote in UPLOADS.items():
            if not os.path.exists(local):
                print(f"❌ File not found: {local}")
                continue
            upload_file(ftp, local, remote)
            time.sleep(1)

        # Inject logs
        inject_log(ftp, LOG_PATH, "Payloads deployed via CursorKitten<3")
        inject_log(ftp, TRIGGER_LOG, "Trigger: CursorKittenDeployed")

        ftp.quit()
        print("🎯 Deployment complete. CursorKitten is purring.")
    except Exception as e:
        print(f"💥 Deployment failed: {e}")

if __name__ == "__main__":
    main()
