export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
      case "/":
        await import("./views/home.js");
        break;
      case "/auth/login/":
        await import("./views/login.js");
        break;
      case "/auth/register/":
        await import("./views/register.js");
        break;
      case "/listing/make/":
        await import("./views/makeListing.js");
        break;
      case "/listing/edit/":
        await import("./views/editListing.js");
        break;
      case "/profil/":
        await import("./views/profile.js");
        break;
      case "/annonse/":
        await import("./views/singleListing.js");
        break;
      default:
        await import("./views/notFound.js");
        break;
    }
  }
