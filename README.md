Cordova Starter
===========

Replace the default www folder with this and start building your Cordova app!

Get Started
===========

1. git clone https://github.com/dawsonloudon/Cordova-Starter.git (NOT into your project folder)

2. cordova create folder_name com.your.name.space 'Your Project Name' (NOT in the Cordova-Starter folder)

3. cd folder_name

4. cordova platform add ios (and / or) cordova platfrom add android

5.
- cordova plugin add org.apache.cordova.device
- cordova plugin add org.apache.cordova.network-information
- cordova plugin add org.apache.cordova.dialogs
- cordova plugin add org.apache.cordova.splashscreen

6. delete www

7. copy www from Cordova-Starter into your project folder

8. Copy contents of www/config.xml into project's config.xml and then `rm -f www/config.xml`

9. cordova build (or) cordova prepare ios (or) cordova run android

Libraries
===========

- fastclickjs v1.0.1
- jquery v2.1.0
- handlebarsjs v1.3.0
- Topcoat v0.8.0 (mobile-light)

Docs
===========

See the [Wiki](https://github.com/dawsonloudon/Cordova-Starter/wiki) for documentation and examples
