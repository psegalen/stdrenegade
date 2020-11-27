# Studio Renegade

Studio Renegade mobile application

## How build this app on iOS

-   Install dependencies
-   Open in Xcode "ios" dossier to delete "Pods" dossier
-   In your terminal, play `pod install` in "iOS" to install pods
-   Xcode projet setup:
    -   In "Général" Tab, in "Frameworks, Libraries, and Embedded Content" add : - libPods-strenegade.a - libRNDeviceinfo.a - libswiftWebKit.tbd
-   In "Build Settings", in "Architectures" add in "Excluded Architectures" for Debug and Release : "Any iOS Simulator SDK" with "arm64" in value.
-   If you have a build error like : "Undefined symbol: ..." on Xcode add an new swift file.
