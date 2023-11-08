var SCRIPT_TITLE = "f-up_moment";

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
		
		var form = {
			"title" : SV.T(SCRIPT_TITLE),
			"buttons" : "OkCancel",
			"widgets" : [			
                {
                    "name": "amountStart",
		 			"type": "Slider",
                    "label": "start - 効き具合",
                    "format": "%10f",
                    "minValue": 0,
                    "maxValue": 10,
                    "interval": 1,
                    "default": 5
                },
                {
                    "name": "timingStart",
		 			"type": "Slider",
                    "label": "start - タイミング",
                    "format": "%1.3f",
                    "minValue": 0,
                    "maxValue": 0.1,
                    "interval": 0.001,
                    "default": 0.025
                },
                {
                    "name": "amountEnd",
		 			"type": "Slider",
                    "label": "end - 効き具合",
                    "format": "%10f",
                    "minValue": 0,
                    "maxValue": 10,
                    "interval": 1,
                    "default": 5
                },
                {
                    "name": "timingEnd",
		 			"type": "Slider",
                    "label": "end - タイミング",
                    "format": "%1.3f",
                    "minValue": 0,
                    "maxValue": 0.1,
                    "interval": 0.001,
                    "default": 0.025
                },
		]};

		var results = SV.showCustomDialog(form);
		if (results.status == 1) {
			for (var i = 0; i < selectedNotes.length; i++) {
				var note = selectedNotes[i];
				var start = note.getOnset();
				var end = note.getEnd();
				
				if (results.answers.amountStart > 0) {
					var upPoint = SV.getProject().getTimeAxis().getBlickFromSeconds(results.answers.timingStart);
					pitch.add(start, 0);
					pitch.add(start + upPoint, results.answers.amountStart * 100);
					pitch.add(start + upPoint * 2, 0);
				}
				if (results.answers.amountEnd > 0) {
					var upPoint = SV.getProject().getTimeAxis().getBlickFromSeconds(results.answers.timingEnd);
					pitch.add(end - (upPoint * 2), 0);
					pitch.add(end - upPoint, results.answers.amountStart * 100);
					pitch.add(end, 0);
				}
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