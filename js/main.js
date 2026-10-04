const youtubeMenu = document.querySelector(".youtube-menu");
const youtubeButton = document.querySelector(".youtube-main");
const youtubeSubmenu = document.querySelector(".youtube-submenu");

function setYoutubeMenuState(isOpen) {
    if (!youtubeMenu || !youtubeButton || !youtubeSubmenu) {
        return;
    }

    youtubeMenu.classList.toggle("is-open", isOpen);

    youtubeButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    youtubeSubmenu.setAttribute(
        "aria-hidden",
        String(!isOpen)
    );

    const submenuItems = youtubeSubmenu.querySelectorAll(
        ".youtube-submenu-item"
    );

    submenuItems.forEach((item) => {
        item.setAttribute(
            "tabindex",
            isOpen ? "0" : "-1"
        );
    });
}

if (youtubeMenu && youtubeButton && youtubeSubmenu) {

    youtubeButton.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen =
            youtubeMenu.classList.contains("is-open");

        setYoutubeMenuState(!isOpen);
    });


    document.addEventListener("click", (event) => {
        if (!youtubeMenu.contains(event.target)) {
            setYoutubeMenuState(false);
        }
    });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            setYoutubeMenuState(false);
            youtubeButton.focus();
        }
    });


    youtubeMenu.addEventListener("mouseenter", () => {
        if (window.matchMedia("(hover: hover)").matches) {
            setYoutubeMenuState(true);
        }
    });


    youtubeMenu.addEventListener("mouseleave", () => {
        if (window.matchMedia("(hover: hover)").matches) {
            setYoutubeMenuState(false);
        }
    });
}