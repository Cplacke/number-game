import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

export const staticRouteHandler = async (pathname) => {
    const file = await Deno.readTextFile('./build'+pathname);
    // Respond to the request with the style.css file.
    return new Response(file, {
        headers: getAssetHeadersFromPath(pathname)
    });
}

const getAssetHeadersFromPath = (pathname) => {
    if (/\.css/.test(pathname)) {
        return {
            'content-type': 'text/css'
        };
    }
    if (/\.jp(e)?g/.test(pathname)) {
        return {
            'content-type': 'image/jpg'
        };
    }
    if (/\.png/.test(pathname)) {
        return {
            'content-type': 'image/png'
        };
    }
    if (/\.svg/.test(pathname)) {
        return {
            'content-type': 'image/svg+xml'
        };
    }
    if (/\.ico/.test(pathname)) {
        return {
            'content-type': 'image/x-icon'
        };
    }
    if (/\.js/.test(pathname)) {
        return {
            'content-type': 'application/javascript'
        };
    }
    // woff and woff2 font MIME types
    if (/\.woff/.test(pathname)) {
        const fontType = pathname.substring(pathname.lastIndexOf('.')+1);
        return {
            'content-type': `font/${fontType}`
        };
    }

    console.error('No "content-type" defined for :', pathname);

}

const requestHandler = async (req) => {
    const { pathname } = new URL(req.url);
    // handle custom asset resolution
    if (pathname !== ("/")) {
        return await staticRouteHandler(pathname);
    }

    const html = await Deno.readTextFile('./build/index.html');
    return new Response(html, {
        headers: {
        "content-type": "text/html",
        },
    });
}

serve(requestHandler);
