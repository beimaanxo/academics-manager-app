# CI/CD: One-click builds for APK / AAB / IPA

You can build mobile binaries in the cloud without local Android Studio/Xcode.

## Option A — GitHub Actions

### 1) Push this project to GitHub
- Create a new repo and push all files.

### 2) Add **Secrets and variables** in GitHub (Repository → Settings → Secrets and variables → Actions)

#### For Android signing (Release AAB)
- `ANDROID_KEYSTORE_BASE64` — base64 of your `release.keystore`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_ALIAS_PASSWORD`

> To generate a keystore locally:
> ```bash
> keytool -genkeypair -v -keystore release.keystore -alias upload -keyalg RSA -keysize 2048 -validity 10000
> # then base64 it
> base64 -i release.keystore | pbcopy  # or clip
> ```

#### For iOS (Ad Hoc IPA)
- `IOS_CERT_BASE64` — base64 of your **.p12** distribution cert
- `IOS_CERT_PASSWORD` — password used when exporting the .p12
- `IOS_PROVISION_PROFILE_BASE64` — base64 of your Ad Hoc provisioning profile for the bundle ID
- `IOS_BUNDLE_ID` — e.g., `com.example.academicsmanager`

> Tip: Use an Ad Hoc profile for device testing, or switch to App Store export if you want a TestFlight / App Store upload lane (can be added).

### 3) Run the workflows
- **Actions → Android CI → Run workflow** → grabs Debug APK automatically and Release AAB if signing secrets exist.
- **Actions → iOS CI → Run workflow** → outputs `AcademicsManager.ipa` as an artifact.

Artifacts appear on the workflow run page for download.

---

## Option B — Codemagic (easiest UI)

1. Connect your GitHub repo in Codemagic.
2. Add the `codemagic.yaml` when prompted.
3. Set code signing assets in Codemagic UI (keystore, p12, profiles).
4. Click **Start new build** → download **AAB/APK** and **IPA** from artifacts.

---

## Notes
- Bundle IDs and product names in native projects must match your store setup.
- For iOS App Store / TestFlight uploads, we can add a lane that uses **App Store Connect API Key** (set secrets `ASC_API_KEY_ID`, `ASC_API_ISSUER_ID`, `ASC_API_KEY_BASE64`). Ping me to include it.
- The Android job always builds a debug APK for quick testing even without signing secrets.