import Button from "@/Components/Button";
import Player from "@/Components/Player/Player";
import { useContext } from "react";
import { createContext } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";
import * as htmlToImage from "html-to-image";

// context
const FieldContext = createContext();

function Wrapper(props) {
    const FieldProvider = FieldContext.Provider;
    const { children } = props;
    const refFormation = useRef(null);
    return (
        <FieldProvider
            value={{
                refFormation,
            }}
        >
            {children}
        </FieldProvider>
    );
}

function Editor(props) {
    const { refFormation } = useContext(FieldContext);
    const { children, className, width, height } = props;
    return (
        <>
            <div
                ref={refFormation}
                style={{ width: width || "100%", height: height || "auto" }}
                className={`relative field w-[378px] h-[480px] scale-[0.9] -translate-x-[30px] sm:translate-x-0 sm:scale-100`}
            >
                {children}
            </div>
        </>
    );
}

function DraggablePlayer(props) {
    const { onSave } = props;
    const { positionPlayer, bodyColor, fontColor, armColor } = props.dataProps;
    return (
        <>
            {positionPlayer?.map((item, i) => (
                <Draggable
                    position={{
                        x: item.posx ? parseFloat(item.posx) : 50,
                        y: parseFloat(item.posy),
                    }}
                    defaultPosition={{
                        x: parseFloat(item.posx),
                        y: parseFloat(item.posy),
                    }}
                    bounds={"parent"}
                    onStop={(e, data) => {
                        onSave(item.id, data.x, data.y);
                    }}
                    key={i}
                    disabled={i >= 5 ? true : false}
                >
                    <div
                        className={`absolute ${
                            i >= 5
                                ? "cursor-default pointer-events-none"
                                : "cursor-move"
                        }`}
                    >
                        <Player
                            color={i + 1 === 1 && "#FFBF00"}
                            bodyColor={bodyColor}
                            armColor={armColor}
                            iconType={item.name}
                            key={i}
                            className={`${i >= 5 && "scale-[0.8]"}`}
                            avatar={item.avatar || undefined}
                        />

                        {item.avatar ? (
                            <p
                                className={`absolute inset-0 flex justify-center items-center text-md font-bold`}
                                style={{
                                    color: fontColor,
                                }}
                            >
                                <span className="rounded-full drop-shadow-md">
                                    {item.number}
                                </span>
                            </p>
                        ) : (
                            <p
                                className={`absolute inset-0 flex justify-center items-center text-md font-bold`}
                                style={{
                                    color: fontColor,
                                }}
                            >
                                {item.number}
                            </p>
                        )}

                        <p
                            className={`text-sm absolute z-[50] text-outline bottom-0 right-1/2 translate-x-1/2 translate-y-full w-[100px] text-center text-white break-words`}
                        >
                            {item.name || "Player"}
                        </p>
                    </div>
                </Draggable>
            ))}
        </>
    );
}

function ButtonOption(props) {
    const { children } = props;
    return (
        <div className="flex justify-center md:justify-around gap-3 mb-4">
            {children}
        </div>
    );
}

function ButtonSave(props) {
    const { onSave } = props;
    return (
        <Button className=" bg-slate-900" onClick={onSave || undefined}>
            Save formation
        </Button>
    );
}

function ButtonCapture() {
    const { refFormation } = useContext(FieldContext);
    const capture = useCallback(() => {
        if (refFormation.current === null) {
            return false;
        }
        htmlToImage
            .toPng(refFormation.current, {
                cacheBust: true,
                quality: 1,
                canvasWidth: 1512,
                canvasHeight: 1840,
            })
            .then(function (dataUrl) {
                var link = document.createElement("a");
                link.download = "Formation.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refFormation]);
    return (
        <>
            <Button className=" bg-slate-900" onClick={() => capture()}>
                Save as image
            </Button>
        </>
    );
}

const Field = {
    Wrapper,
    ButtonCapture,
    Editor,
    ButtonOption,
    ButtonSave,
    DraggablePlayer,
};

export default Field;
