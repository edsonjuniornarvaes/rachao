import Svg, { ClipPath, Defs, G, Mask, Path, SvgProps } from "react-native-svg";

const GoogleSvg = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Mask
        id="b"
        width={24}
        height={24}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <Path
          fill="#fff"
          d="M23.557 9.818H12.375v4.637h6.436c-.6 2.945-3.109 4.636-6.436 4.636A7.077 7.077 0 0 1 5.285 12a7.077 7.077 0 0 1 7.09-7.09c1.69 0 3.218.6 4.418 1.58L20.284 3c-2.127-1.855-4.854-3-7.909-3-6.655 0-12 5.345-12 12s5.345 12 12 12c6 0 11.455-4.364 11.455-12 0-.71-.11-1.473-.273-2.182Z"
        />
      </Mask>
      <G mask="url(#b)">
        <Path fill="#FBBC05" d="M-.716 19.091V4.909L8.557 12l-9.273 7.091Z" />
      </G>
      <Mask
        id="c"
        width={24}
        height={24}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <Path
          fill="#fff"
          d="M23.557 9.818H12.375v4.637h6.436c-.6 2.945-3.109 4.636-6.436 4.636A7.077 7.077 0 0 1 5.285 12a7.077 7.077 0 0 1 7.09-7.09c1.69 0 3.218.6 4.418 1.58L20.284 3c-2.127-1.855-4.854-3-7.909-3-6.655 0-12 5.345-12 12s5.345 12 12 12c6 0 11.455-4.364 11.455-12 0-.71-.11-1.473-.273-2.182Z"
        />
      </Mask>
      <G mask="url(#c)">
        <Path
          fill="#EA4335"
          d="M-.716 4.91 8.557 12l3.818-3.327 13.09-2.127v-7.637H-.714v6Z"
        />
      </G>
      <Mask
        id="d"
        width={24}
        height={24}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <Path
          fill="#fff"
          d="M23.557 9.818H12.375v4.637h6.436c-.6 2.945-3.109 4.636-6.436 4.636A7.077 7.077 0 0 1 5.285 12a7.077 7.077 0 0 1 7.09-7.09c1.69 0 3.218.6 4.418 1.58L20.284 3c-2.127-1.855-4.854-3-7.909-3-6.655 0-12 5.345-12 12s5.345 12 12 12c6 0 11.455-4.364 11.455-12 0-.71-.11-1.473-.273-2.182Z"
        />
      </Mask>
      <G mask="url(#d)">
        <Path
          fill="#34A853"
          d="M-.716 19.091 15.648 6.546l4.309.545 5.509-8.182v26.182H-.716v-6Z"
        />
      </G>
      <Mask
        id="e"
        width={24}
        height={24}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <Path
          fill="#fff"
          d="M23.557 9.818H12.375v4.637h6.436c-.6 2.945-3.109 4.636-6.436 4.636A7.077 7.077 0 0 1 5.285 12a7.077 7.077 0 0 1 7.09-7.09c1.69 0 3.218.6 4.418 1.58L20.284 3c-2.127-1.855-4.854-3-7.909-3-6.655 0-12 5.345-12 12s5.345 12 12 12c6 0 11.455-4.364 11.455-12 0-.71-.11-1.473-.273-2.182Z"
        />
      </Mask>
      <G mask="url(#e)">
        <Path
          fill="#4285F4"
          d="m25.466 25.091-16.91-13.09-2.181-1.637 19.09-5.455v20.182Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default GoogleSvg;
