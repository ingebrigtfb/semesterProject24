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
      case "/lage/":
        await import("./views/createListing.js");
        break;
      case "/rediger/":
        await import("./views/editListing.js");
        break;
      case "/profil/":
        await import("./views/profile.js");
        break;
      case "/annonse/":
        await import("./views/singleListing.js");
        break;
        case "/oppdater-profil/":
        await import("./views/updateProfile.js");
        break;
      default:
        await import("./views/notFound.js");
        break;
    }
  }
