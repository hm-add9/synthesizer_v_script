var SCRIPT_TITLE = "f-vibrato_pichbend";

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
		
		if (selectedNotes.length == 0) {
			SV.showMessageBox(SV.T(SCRIPT_TITLE), SV.T("Please select at least one note."))
			SV.finish()
			return;
		}

		var scope = SV.getMainEditor().getCurrentGroup();
		var group = scope.getTarget();
		var pitch = group.getParameter("pitchDelta");
		
		var deep = 20;					// ビブラートの深さ
		var hz = 100;					// ビブラートの周期
		var delay = 0;					// ビブラートの開始遅延時間

		var form = {
			"title" : SV.T(SCRIPT_TITLE),
			"buttons" : "OkCancel",
			"widgets" : [			
                {
                    "name": "deep",
		 			"type": "Slider",
                    "label": "深さ",
                    "format": "%100f",
                    "minValue": 0,
                    "maxValue": 100,
                    "interval": 1,
                    "default": deep
                },
                {
                    "name": "hz",
		 			"type": "Slider",
                    "label": "周期(ミリ秒)",
                    "format": "%3.0f",
                    "minValue": 0,
                    "maxValue": 1000,
                    "interval": 10,
                    "default": hz
                },
                {
                    "name": "start",
		 			"type": "Slider",
                    "label": "開始タイミング(ミリ秒)",
                    "format": "%3.0f",
                    "minValue": 0,
                    "maxValue": 1000,
                    "interval": 10,
                    "default": delay
                },
		]};

		var results = SV.showCustomDialog(form);
		if (results.status == 1) {
			for (var i = 0; i < selectedNotes.length; i++) {
				var note = selectedNotes[i];
				var start = (results.answers.start) ? note.getOnset() + SV.getProject().getTimeAxis().getBlickFromSeconds(results.answers.start / 1000): note.getOnset();
				var end = note.getEnd();

				// reset note vibrato
				note.setAttributes({
					dF0Vbr: 0
				});
				// clear all pichbend at selected note
				// pitch.removeAll();

				pitch.add(start, 0);			// start point. value = 0;

				var pahse = 1;
				var blickHz = SV.getProject().getTimeAxis().getBlickFromSeconds(results.answers.hz / 1000);	//			unit4 / results.answers.hz;
				for (var blick = start + blickHz; blick < end; blick += blickHz) {
					pitch.add(blick, results.answers.deep * pahse);
					pahse = pahse * -1;
				}
				pitch.add(end, 0);
			}
		}

	} catch (error) {
		SV.showMessageBox(SV.T(SCRIPT_TITLE), error.message);
	} finally {
		SV.finish();
	}
}

// function toBlick(note) {

// 	var unit4 = SV.QUARTER;			// 4部音符のブリック数

// 	if (note == 1) {
// 		return unit4 / 4;
// 	}
// 	if (note == 2) {
// 		return unit4 / 4;
// 	}
// 	if (note == 1) {
// 		return unit4 / 4;
// 	}
// 	if (note == 1) {
// 		return unit4 / 4;
// 	}
// }