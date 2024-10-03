import React, { useEffect, useRef } from "react";
import useDarkModeStore from "../../Store/DarcModeStore";

const Translate = () => {
  const { darkMode } = useDarkModeStore();
  const googleTranslateRef = useRef(null);

  useEffect(() => {
    const initializeGoogleTranslate = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "ru",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          includedLanguages: "en,ru,uz,ky",
        },
        googleTranslateRef.current
      );
    };

    const applyStylesToTranslateWidget = () => {
      const widgetEl = document.querySelector(".goog-te-gadget-simple");
      if (widgetEl) {
        widgetEl.classList.add("custom-translate-widget");

        if (darkMode) {
          widgetEl.classList.add("goog-te-gadget-simple-light");
          widgetEl.classList.remove("goog-te-gadget-simple-dark");
        } else {
          widgetEl.classList.add("goog-te-gadget-simple-dark");
          widgetEl.classList.remove("goog-te-gadget-simple-light");
        }

        const selectEl = widgetEl.querySelector("select");
        if (selectEl) {
          if (darkMode) {
            selectEl.classList.add("dark-mode-option");
            selectEl.classList.remove("light-mode-option");
          } else {
            selectEl.classList.add("light-mode-option");
            selectEl.classList.remove("dark-mode-option");
          }
        }

        const unwantedEl = document.querySelector(".goog-te-banner-frame.skiptranslate");
        if (unwantedEl) {
          unwantedEl.style.display = "none";
        }
      }
    };

    if (window.google && window.google.translate) {
      initializeGoogleTranslate();

      const observer = new MutationObserver(() => {
        applyStylesToTranslateWidget();
      });

      observer.observe(googleTranslateRef.current, { childList: true });
      applyStylesToTranslateWidget();
    } else {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        initializeGoogleTranslate();
        applyStylesToTranslateWidget();

        const observer = new MutationObserver(() => {
          applyStylesToTranslateWidget();
        });

        observer.observe(googleTranslateRef.current, { childList: true });
      };
    }
  }, [darkMode]);

  return (
    <div ref={googleTranslateRef} className="google-translate-container unique-style"></div>
  );
};

export default Translate;
