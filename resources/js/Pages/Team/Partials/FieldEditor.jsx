import Field from "@/Components/Field/Field";
import React from "react";

function FieldEditor(props) {
    const { handlePlayerPosition, handleFormationSave } = props;
    const { positionPlayer, bodyColor, fontColor, armColor } = props.dataProps;
    return (
        <div className="flex flex-col">
            <Field.Wrapper>
                <Field.ButtonOption>
                    <Field.ButtonSave onSave={() => handleFormationSave()} />
                    <Field.ButtonCapture />
                </Field.ButtonOption>
                <Field.Editor width={378} height={480}>
                    <Field.DraggablePlayer
                        dataProps={{
                            positionPlayer,
                            bodyColor,
                            fontColor,
                            armColor,
                        }}
                        onSave={handlePlayerPosition}
                    />
                </Field.Editor>
            </Field.Wrapper>
        </div>
    );
}

export default FieldEditor;
