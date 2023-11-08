var SCRIPT_TITLE = "f-vibrato";

function getClientInfo() {
	return {
		"name" : SV.T(SCRIPT_TITLE),
		"author" : "fukuda takumi",
		"versionNumber" : 1.0,
	};
}

function main() {
	try {
		var selection = SV.getMainEditor().getSelection();
		var selectedNotes = selection.getSelectedNotes();
		
		if (selectedNotes.length != 1) {
			SV.showMessageBox(SV.T(SCRIPT_TITLE), SV.T("Please select at least one note."))
			SV.finish()
			return;
		}

		var note = selectedNotes[0];
		var scope = SV.getMainEditor().getCurrentGroup();
		var voice = scope.getVoice();

		var currentAttr = note.getAttributes();
		var form = {
			"title" : SV.T(SCRIPT_TITLE),
			"buttons" : "OkCancel",
			"widgets" : [
                {
                    "name": "deep",
					"type": "Slider",
                    "label": "深さ",
                    "format": "%1.2f",
                    "minValue": 0,
                    "maxValue": 2,
                    "interval": .01,
                    "default": currentAttr.dF0Vbr ? currentAttr.dF0Vbr : 1.0
                },
                {
                    "name": "hz",
					"type": "Slider",
                    "label": "周波数（Hz）",
                    "format": "%1.2f",
                    "minValue": 1,
                    "maxValue": 10,
                    "interval": 0.01,
                    "default": currentAttr.fF0Vbr ? currentAttr.fF0Vbr : 5.0
                },
                {
                    "name": "start",
					"type": "Slider",
                    "label": "開始タイミング（秒）",
                    "format": "%1.3f",
                    "minValue": 0,
                    "maxValue": 1,
                    "interval": 0.001,
                    "default": currentAttr.tF0VbrStart ? currentAttr.tF0VbrStart : 0
                },
                {
                    "name": "left",
					"type": "Slider",
                    "label": "ビブラート - 左（秒）",
                    "format": "%1.3f",
                    "minValue": 0,
                    "maxValue": 1,
                    "interval": 0.01,
                    "default": currentAttr.tF0VbrLeft ? currentAttr.tF0VbrLeft : 0.2
                },
                {
                    "name": "right",
					"type": "Slider",
                    "label": "ビブラート - 右（秒）",
                    "format": "%1.3f",
                    "minValue": 0,
                    "maxValue": 1,
                    "interval": 0.001,
                    "default": currentAttr.tF0VbrRight ? currentAttr.tF0VbrRight : 0.2
                },
                {
                    "name": "phase",
					"type": "Slider",
                    "label": "ビブラート - 位相（調整中です）",
                    "format": "%1.2f",
                    "minValue": Math.PI * -1,
                    "maxValue": Math.PI,
                    "interval": 0.01,
                    "default": currentAttr.pF0Vbr ? currentAttr.pF0Vbr : 0
                },
				// {
                //     "name": "test",
				// 	"type": "TextBox",
                //     "label": "deep",
                //     "default": scope.dF0Vbr
                // },
				// {
                //     "name": "test1",
				// 	"type": "TextBox",
                //     "label": "hz",
                //     "default": scope.fF0Vbr
                // },
				// {
                //     "name": "test2",
				// 	"type": "TextBox",
                //     "label": "start",
                //     "default": scope.tF0VbrStart
                // },
			]
		};
		var results = SV.showCustomDialog(form);
		if (results.status == 1) {
			note.setAttributes({
				dF0Vbr: results.answers.deep,
				fF0Vbr: results.answers.hz,
				tF0VbrStart: results.answers.start,
				tF0VbrLeft: results.answers.left,
				tF0VbrRight: results.answers.right,
				pF0Vbr: results.answers.phase
			});
		}

	} catch (error) {
		SV.showMessageBox(SV.T(SCRIPT_TITLE), error.message);
	} finally {
		SV.finish();
	}
}